'use client'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { UserType } from '../models/user'
import { Types } from 'mongoose'

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  type UserWithId = UserType & {_id:Types.ObjectId};

  const fetcher = (url:string) => fetch(url).then(r => r.json());
  const { data: user, mutate: mutateUser, isLoading  } = useSWR<UserWithId>('/api/loggedIn',fetcher)


  useEffect(() => {
    console.log("effect running")
    
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
  console.log("this is user",user);
  return { user, mutateUser, isLoading }
}
