import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation, Routes } from 'react-router-dom';
import { useRef } from 'react';

export const AnimatedRoutes = ({ children }) => {
    const location = useLocation();
    const nodeRef = useRef(null); // ✅ создаём nodeRef

    return (
        <TransitionGroup component={null}>
            <CSSTransition
                key={location.pathname}
                classNames="fade"
                timeout={300}
                nodeRef={nodeRef} // ✅ передаём nodeRef
            >
                <div ref={nodeRef}>
                    <Routes location={location}>
                        {children}
                    </Routes>
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
};
