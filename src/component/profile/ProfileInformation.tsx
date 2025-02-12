import { User } from "../../types/user";

type Props = {
    user: User
};

function ProfileInformation({user}: Props) {
    return (
        <div className="pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                        Name
                    </label>
                    <div className="mt-2">
                        {user?.name}
                    </div>
                </div>

                <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        {user?.email}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInformation;