import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Button } from 'react-native-styled-paper';

const onPressFn = action("onPress");

storiesOf('Button', module)
    .addDecorator(withKnobs)
    .add('Default', () => {
        const title = text("title", "Text");
        return (
        <Button
            onPress={onPressFn}
        >
            {title}
        </Button>
        )
    })
    .add('Primary', () => {
        const title = text("title", "Text");
        const mode = select('theme', ['text', 'outlined', 'contained'], "text");
        const dark = boolean('dark', false);

        return (
        <Button
            dark={dark}
            mode={mode}
            onPress={onPressFn}
        >
            {title}
        </Button>
        )
    })