import * as Yup from 'yup';

const CreateSchema = Yup.object().shape({
    type: Yup.string().required('Please enter a type'),

    FName: Yup.string()
        .min(2, 'Your name must be between 2 and 30 characters')
        .max(30, 'Your name must be between 2 and 30 characters')
        .required('Please enter first name')
        .matches(
            /^[A-Za-z0-9 ]+$/,
            'Your first name must be composed only with letter and numbers'
        ),

    email: Yup.string()
        .min(8, 'Your email must content Minimum eight characters')
        .max(50, 'Too Long!')
        .required('Please enter an Email')
        .matches(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
            'Your email must be in email format'
        ),
    password: Yup.string()
        .min(8, 'Your password must content Minimum eight characters')
        .max(50, 'Too Long Pro!')
        .required('Please enter a Password')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            'Your password must content Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
        ),
    phone: Yup.string()
        .min(4, 'Your number must be between 4 and 16 characters')
        .max(16, 'Your number must be between 4 and 16 characters')
        .required('Please enter a Phone')
        .matches(/^[0-9]+$/, 'Your phone must be composed only with numbers'),
    confirmPassword: Yup.string()
        .required('Please enter a password confirmation')
        .oneOf(
            [Yup.ref('password'), null],
            'The password confirmation does not match password'
        ),
});

export default CreateSchema;
