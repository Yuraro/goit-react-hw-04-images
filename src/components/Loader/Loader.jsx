import { Grid } from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';

export const Loader = () => {
	return (
    <Wrapper>
        <Grid
            height="80"
            width="80"
            color="#b8a4f4"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
/>
    </Wrapper>
);
}  