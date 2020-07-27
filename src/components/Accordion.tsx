import React, { useState } from 'react';

interface AccordianProps {
    items: any[];
    someString: string;
}

const Accordian = (props: AccordianProps): JSX.Element => {
    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = (index: any) => {
        setActiveIndex(index);
    };

    const renderedItems = props.items.map((item, index) => {
        const active = index === activeIndex ? 'active' : '';
        return <React.Fragment key={item.title}>
            <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
                <i className="dropdown icon" />
                {item.title}
            </div>
            <div className={`content ${active}`}>
                <p>{item.content}</p>
            </div>
        </React.Fragment>
    });

    return <div className="ui styled accordion">
        {renderedItems}
    </div>
};

export default Accordian;