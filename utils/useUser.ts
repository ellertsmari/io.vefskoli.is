import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { UserType } from '../models/user'
import { Types } from 'mongoose';

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {

  type UserWithId = UserType & {_id:Types.ObjectId};
  const { data: user, mutate: mutateUser } = useSWR<UserWithId>('/api/loggedIn')

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }
}
