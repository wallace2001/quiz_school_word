import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
`;

export const Content = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    .quiz{
        width: 60%;
        height: auto;

        border: 1px solid #ccc;
        margin-bottom: 20px;


        label{
            padding: 1rem;
            font-size: 1.4rem;

            p{
                font-size: 1rem;
            }
        }

        .question{
            width: 100%;
            height: auto;

            padding: 5%;

            p{
                font-size: 1rem;
                color: #656565;
            }

            img{
                margin: 0 auto;
            }
        }

        .selection{
            width: 100%;
            height: auto;

            display: flex;
            flex-direction: column;
            justify-content: flex-start;


            input{
                margin-top: 30px;
            }
        }

        .button{
            width: 100%;
            height: 100%;

            padding: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;