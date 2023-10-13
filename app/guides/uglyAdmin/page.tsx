import React from 'react'
import { Guide } from '@/models/guide';
import { connectToDatabase } from '@/utils/mongoose-connector';

const getGuides = () => {
  connectToDatabase();
  return Guide.find({});
}
export default async () => {
  const guides = await getGuides();
  return (
    <div>
      {guides.map((guide) => {
        return <p>{guide.title}</p>
      })}
      <h1>Ugly Admin</h1>
      <p>Ugly Admin</p>
      <p>Ugly Admin</p>
      <p>Ugly Admin</p>
    </div>
  )
}