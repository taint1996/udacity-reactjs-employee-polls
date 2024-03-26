import { User } from "../features/models/User";
import ImgSnow from "../assets/snow.jpg";
import ImgLeaf from "../assets/leaf.jpg";
import ImgTyler from "../assets/tyler.jpg";

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

export const showImageUser = (avatarURL: string | null | undefined) => {
  switch (avatarURL) {
    case "../assets/leaf.jpg":
      return ImgLeaf;
    case "../assets/tyler.jpg":
      return ImgTyler;
    default:
      return ImgSnow;
  }
};
