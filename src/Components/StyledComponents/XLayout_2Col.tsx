import React, {ReactNode} from 'react';

interface IProps {
    className?: string
    children: {
        col1: ReactNode
        col2: ReactNode
    }
}

const XLayout2Col = (props: IProps) => {

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'row' as 'row',
            padding: '50px'
        },
        col1: {
            flex: '1',
            paddingRight: '50px'
        },
        col2: {
            minWidth: '360px'
        }
    }

    return (
        <section className={props.className} style={styles.container}>
            <div style={styles.col1}>{props.children.col1}</div>
            <div style={styles.col2} className={'unsetMin'}>{props.children.col2}</div>
        </section>
    );
};

export default XLayout2Col;