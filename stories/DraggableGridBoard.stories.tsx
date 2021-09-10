import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Example from '../src/App'

export default {
  title: 'Examples/DraggableGridBoard',
  component: Example,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Example>;

const Template: ComponentStory<typeof Example> = (args) => <Example {...args} />;

export const DraggableGridBoardExample = Template.bind({});
DraggableGridBoardExample.args = {
};
