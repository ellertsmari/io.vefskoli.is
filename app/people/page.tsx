"use client";
import React, { useEffect, useState } from 'react';
import { UserWithIdType } from '@/models/user';
import { MainContent } from '@/components/mainLayout';
import styled from 'styled-components';
import { ButtonContainer } from '@/components/person/person-style';
import PersonDropDown from '@/components/person/person';

const TitlePage = styled.h1`
    font-style: Poppins;
    font-size: 32px;
`;

type Props = {
    user: UserWithIdType;
};

const PeoplePage = ({ user }: Props) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [users, setUsers] = useState<UserWithIdType[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users');
            const data = await response.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    const toggleDropdown = (userId: string) => {
        setOpenDropdown((prevOpenDropdown) => (prevOpenDropdown === userId ? null : userId));
    };

    return (
        <MainContent>
            <TitlePage>People</TitlePage>
            <ButtonContainer>
                {users.map((user) => (
                    <PersonDropDown
                        key={user._id.toString()}
                        user={user}
                        isOpen={openDropdown === user._id.toString()}
                        toggleDropdown={() => toggleDropdown(user._id.toString())}
                    />
                ))}
            </ButtonContainer>
        </MainContent>
    );
};

export default PeoplePage;
