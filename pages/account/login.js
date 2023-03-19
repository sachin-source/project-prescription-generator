import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import Link from 'next/link';
// import { Link } from 'components';
import { userService } from '../../services';
import styles from "../../styles/Login.module.css"


export default Login;

function Login() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ username, password }) {
        return userService.login(username, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            })
            .catch((e) => {
                console.log("alertService.error", e)
            });
    }

    return (
            <div className={styles.card}>
                <div className={styles["card-container"]} >
                <h4 className="card-header">Login</h4>
                <div className={styles["card-body"]}>
                    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                        <div className={styles["form-group"]}>
                            <label>Username</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className={styles["form-group"]}>
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Login
                        </button>
                        {/* <Link  className="btn btn-link">
                            <a href="/account/register">
                            Register
                            </a>
                        </Link> */}
                    </form>
                </div>
                </div>
            </div>
    );
}
