import type { NextPage } from "next"
import {
    DockviewReact,
    DockviewReadyEvent,
    PanelCollection,
    IDockviewPanelProps,
    IDockviewPanelHeaderProps,
} from 'dockview';

const components: PanelCollection<IDockviewPanelProps> = {
    default: (props: IDockviewPanelProps<{ someProps: string }>) => {
        return <div>{props.params.someProps}</div>;
    },
};

const headers: PanelCollection<IDockviewPanelHeaderProps> = {
    customTab: (props: IDockviewPanelHeaderProps) => {
        return (
            <div>
                <span>{props.api.title}</span>
                <span onClick={() => props.api.close()}>{'[x]'}</span>
            </div>
        );
    },
};

const TabsDockView: NextPage = () => {
    const onReady = (event: DockviewReadyEvent) => {
        event.api.addPanel({
            id: 'panel1',
            component: 'default',
            tabComponent: 'customTab', // optional custom header
            params: {
                someProps: 'Hello',
            },
        });
        event.api.addPanel({
            id: 'panel2',
            component: 'default',
            params: {
                someProps: 'World',
            },
            position: { referencePanel: 'panel1', direction: 'below' },
        });
    };

    return (
        <DockviewReact
            components={components}
            tabComponents={headers} // optional headers renderer
            onReady={onReady}
        />
    );
};

export default TabsDockView