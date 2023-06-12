import { useState } from 'react';
import { notification } from 'components/Notification/Notification';
import { FcCamera } from 'react-icons/fc';
import {
    Form,
    FormButton,
    FormInput,
    Header,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (value === '') {
            notification('The search input cannot be empty. Please enter a search query');
            return;
        }

        onSubmit(value.trim().toLowerCase());
        setValue('');
    };

    return (
        <Header>
            <Form type="submit" onSubmit={handleSubmit}>
                <FormButton>
                    <FcCamera size="30" />
                </FormButton>

                <FormInput
                    onChange={handleChange}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={value}
                />
            </Form>
        </Header>
    );
};

export default Searchbar;
