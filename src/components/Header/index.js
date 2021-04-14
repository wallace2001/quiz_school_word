import styled from 'styled-components';
import { FaUserAlt } from 'react-icons/fa';
import { RiArrowDownSFill } from 'react-icons/ri';
import React, { useContext, useEffect } from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider,
  } from "@chakra-ui/react"
import { AuthContext } from '../../providers/provider';
import { useRouter } from 'next/router';

const Container = styled.div`
    width: 100%;
    height: 60px;

    padding: 1rem 10% 1rem 10%;
    background-color: red;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .profile{
        display: flex;
        align-items: center;

        p{
            padding: 0px 5px 0px 5px;
            color: #fff;
        }
    }
`;

export const Header = () => {

    const { logout, name, auth } = useContext(AuthContext);
    const router = useRouter();

    return (
            <Container>
            <Content>
                <div style={{width: '140px', height: '40px', display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => router.push('/menu')}>
                    <img src="/quiz.png" alt="logo"/>
                </div>

                <div className="profile">
                    <Menu>
                        <MenuButton>
                            <label style={{display: 'flex', alignItems: "center"}}>
                            <FaUserAlt color="#fff" />
                            <p style={{padding: "0px 5px 0px 5px"}}>{name}</p>
                            <RiArrowDownSFill color="#fff" />
                            </label>
                        </MenuButton>
                        <MenuList>
                            <MenuGroup>
                            <MenuItem>Minha conta</MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuItem onClick={() => router.push('/classfication')}>Classificação</MenuItem>
                            <MenuItem onClick={() => router.push('/menu')}>Quizes</MenuItem>
                            <MenuItem onClick={logout}>Sair</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Content>
        </Container>
    )
}
