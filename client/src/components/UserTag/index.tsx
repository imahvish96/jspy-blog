import { IUserTagProps } from "../../types/props.interface";
import { formateDate } from "../../utils";

function UserTag({ avatar, username, createdAt }: IUserTagProps) {
  return (
    <div className="flex items-center mb-4">
      <div className="w-9 h-9 mr-4">
        <img
          src={avatar}
          alt={username}
          className="object-cover w-full h-full rounded-full"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{username}</p>
            <p className="text-gray-600">{formateDate(createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserTag;
