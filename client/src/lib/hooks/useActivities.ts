import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./useAccount";
import { useStore } from "./useStore";

export const useActivities = (id?: string) => {


    const {activityStore: {filter, startDate}} = useStore();  
    const queryClient = useQueryClient();
    const { currentUser } = useAccount();
    const location = useLocation();

    const { data: activitiesGroup, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<PagedList<Activity, string>>({

        //fetches thre full list 
        queryKey: ["activities", filter, startDate],
        //sends a get request to the api to fetch the activities
        queryFn: async ({ pageParam = null }) => {
            const response = await agent.get<PagedList<Activity, string>>("/activities", {
                params: {
                    cursor: pageParam,
                    pageSize: 3,
                    filter,
                    startDate
                }
            });
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled: !id && location.pathname === '/activities' && !!currentUser,
        select: (data) => ({
            ...data,
            pages: data.pages.map((page) => ({
                ...page,
                items: page.items.map(activity => {
                    const host = activity.attendees.find((x) => x.id === activity.hostId);
                    return {
                        ...activity,
                        isHost: currentUser?.id === activity?.hostId,
                        isGoing: activity.attendees.some(x => x.id === currentUser?.id),
                        hostImageUrl: host?.imageUrl
                    };
                }),
            })),
        })
    });

    const { data: activity, isLoading: isLoadingActivity } = useQuery({

        //fetches an activity based on an id
        queryKey: ['activities', id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentUser,
        //for individual activity
        select: data => {

            const host = data.attendees.find(x => x.id === data.hostId);

            return {
                ...data,
                //checks if the current user is the host of the activity and if they are going to the activity
                isHost: currentUser?.id === data.hostId,
                isGoing: data.attendees.some(x => x.id === currentUser?.id),
                hostImageUrl: host?.imageUrl,
            }
        }
    })

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put('/activities', activity)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']

            })
        }
    })

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']

            })
        }
    })


    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.post('/activities', activity);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }

    })


    const updateAttendance = useMutation({

        mutationFn: async (id: string) => {

            await agent.post(`/activities/${id}/attend`)
        },
        onMutate: async (activityId: string) => {
            //canceling any ongoing queries
            await queryClient.cancelQueries({ queryKey: ['activities', activityId] });

            const prevActivity = queryClient.getQueryData<Activity>(['activities', activityId]);


            //updates the react query cache for a specific activity based on
            //the activity key, which is the query cache identifier. it scopes data to a single
            //activity by id. activityId, makes each cache entry unique.

            //'activities' is the query key that groups activities together
            queryClient.setQueryData<Activity>(['activities', activityId], oldActivity => {
                if (!oldActivity || !currentUser) {
                    return oldActivity;
                }


                const isHost = oldActivity.hostId === currentUser.id;
                const isAttending = oldActivity.attendees.some(x => x.id === currentUser.id);

                return {
                    ...oldActivity,
                    isCancelled: isHost ? !oldActivity.isCancelled : oldActivity.isCancelled,
                    attendees: isAttending
                        ? isHost
                            ? oldActivity.attendees
                            : oldActivity.attendees.filter(x => x.id !== currentUser.id)
                        : [...oldActivity.attendees, {
                            id: currentUser.id,
                            displayName: currentUser.displayName,
                            imageUrl: currentUser.imageUrl
                        }]
                }
            });
            return { prevActivity };
        },
        onError: (error, activityId, context) => {


            console.log("Prev activity" + context?.prevActivity)
            console.log(error);

            if (context?.prevActivity) {
                //this sets previous activity if we get an error
                queryClient.setQueryData(['activities', activityId], context.prevActivity);
            }
        }
    })

    return {
        activitiesGroup,
        isLoading,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isLoadingActivity,
        updateAttendance,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage
    }
}