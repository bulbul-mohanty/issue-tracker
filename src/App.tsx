import React from 'react';
import Accordian from './components/Accordion';
import Search from './components/Search';

const items = [
    {
        title: 'Title 100',
        content: 'Some content about title 100'
    },
    {
        title: 'Title 200',
        content: 'Some content about title 200'
    },
    {
        title: 'Title 300',
        content: 'Some content about title 300'
    }
]

export default () => {
    return (
        <div>

            {/* <Accordian items={items} someString={'hi'}></Accordian> */}
            <Search></Search>
        </div>
    )
};
