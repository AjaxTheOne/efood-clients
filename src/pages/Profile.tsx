import { useEffect, useState } from 'react';
import ProfileAddresses from '../component/profile/ProfileAddresses';
import ProfileInformation from '../component/profile/ProfileInformation';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { Address, AddressResponse } from '../types/addresses';

function Profile() {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState<Address[]>([]);

    useEffect(() => {
        axiosInstance.get<AddressResponse>("/client/users/addresses")
            .then((response) => {
                if (!response.data.success) {
                    return;
                }

                setAddresses(response.data.data.addresses);
            });
    }, []);

    return (
        <div className="space-y-12 grid grid-cols-2 gap-x-8">
            <ProfileInformation user={user!} />
            <ProfileAddresses addresses={addresses}/>
        </div>
    );
}

export default Profile;