import { User } from "../features/models/User";

export const sortedUsers = (users: User[]) => {
  return users.sort((userA, userB) => {
    // sort by Length Question list.
    const questionsLengthDiff =
      (userB.questions?.length ?? 0) - (userA.questions?.length ?? 0);
    if (questionsLengthDiff !== 0) {
      return questionsLengthDiff;
    }
    // Sort by Length answer object list
    return (
      (Object.values(userB?.answers ?? {}).length ?? 0) -
      (Object.values(userA?.answers ?? {}).length ?? 0)
    );
  });
};
