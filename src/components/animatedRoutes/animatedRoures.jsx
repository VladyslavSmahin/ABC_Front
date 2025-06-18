import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation, Routes } from 'react-router-dom';

 export const AnimatedRoutes = ({ children }) => {
    const location = useLocation();

    return (
        <TransitionGroup component={null}>
            <CSSTransition
                key={location.pathname}
                classNames="fade"
                timeout={300}
            >
                <Routes location={location}>
                    {children}
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};
