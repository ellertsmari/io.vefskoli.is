// "use client"

// import { MainContent } from "@/components/mainLayout";
import { GroupsPage } from "@/components/mainLayout";
import PersonCard from "./PersonCard/index";
import { Return } from "@/models/return";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { GroupContainer, Heading } from "./PersonCard/style";
//This is a serverside component that mostly handles data fetching and passing it to the Guides component

interface Group {
  users: any[];
  groupSize: number;
}

const getUser = async () => {
  await connectToDatabase();
  try {
    const users = await Return.aggregate([
      // Lookup: Get the guide details from guides collection
      {
        $lookup: {
          from: "guides",
          localField: "guide", // guide in returns collection
          foreignField: "_id", // _id in guides collection
          as: "guideDetails",
        },
      },
      { $unwind: "$guideDetails" }, // Flatten guideDetails array

      // Match only guides from module 5 & 6
      {
        $match: {
          "guideDetails.module.title": {
            $in: ["5 - Back-end & Infrastructure", "6 - Growing complexity"],
          },
        },
      },

      // Group by user and count returns
      {
        $group: {
          _id: "$owner", // Group by user ID (owner in returns)
          returnCount: { $sum: 1 }, // Count number of returned guides
        },
      },

      // Lookup: Get user details from users collection
      {
        $lookup: {
          from: "users",
          localField: "_id", // User ID in grouped result
          foreignField: "_id", // User _id in users collection
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" }, // Flatten userDetails array

      // Sort users by most returns
      { $sort: { returnCount: -1 } },

      // Project only needed fields
      {
        $project: {
          _id: 1,
          name: "$userDetails.name", // Assuming users have a name field
          returnCount: 1,
        },
      },
    ]).exec();

    return users;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const Groups = async () => {
  const users = await getUser();

  const groupUsers = ({ users, groupSize }: Group) => {
    const groups = [];
    for (let i = 0; i < users.length; i += groupSize) {
      groups.push(users.slice(i, i + groupSize));
    }
    return groups;
  };

  const groupedUsers = groupUsers({ users, groupSize: 4 });

  return (
    <GroupsPage>
      {groupedUsers.map((group, index) => {
        return (
          <div key={index}>
            <Heading>Group {index + 1}</Heading>
            <GroupContainer>
            {group.map((user) => {
              return (
                <PersonCard name={user.name} returnCount={user.returnCount} />
              );
            })}
            </GroupContainer>
          </div>
        );
      })}
    </GroupsPage>
  );
};

export default Groups;
