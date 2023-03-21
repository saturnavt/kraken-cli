import type { NextPage } from "next"
import { useState } from "react"
import Terminal from "@/components/Terminal"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const TabsComponent: NextPage = () => {
    const [tabKey, setTabkey] = useState<string>("Main");
    const [tabsAdd, setTabsAdd] = useState<number[]>([]);

    const addTab = (e: any) => {
        setTabkey(e);
        if (e == "+") {
            if (tabsAdd.length == 0) {
                setTabsAdd(tabsAdd => [...tabsAdd, 1]);
                setTabkey("1");
            } else {
                let lastElement = tabsAdd[tabsAdd.length - 1];
                setTabsAdd(tabsAdd => [...tabsAdd, lastElement + 1]);

                let currentTab = lastElement + 1;
                console.log(currentTab)
                setTabkey(currentTab.toString());
            }
        }
    }

    const deleteTab = (tabToDelete: string) => {
        let deleteTabs = tabsAdd.filter(function (element) {
            return element.toString() !== tabToDelete;
        });
        setTabsAdd(deleteTabs);
    }

    return (
        <Tabs
            // defaultActiveKey={tabKey}
            id="uncontrolled-tab-example"
            className="mb-3"
            // defaultValue={tabKey}
            activeKey={tabKey}
            onSelect={(e) => addTab(e)}

        >
            <Tab eventKey="Main" title="Main" color="white">
                <Terminal />
            </Tab>
            {
                tabsAdd.map((tabAdded) => {
                    return <Tab eventKey={tabAdded.toString()} title={
                        <div className="divAdded" >
                            {"Terminal " + tabAdded.toString()}
                            <button style={{ color: 'red', marginLeft: '6px', float: 'right', marginTop: '-2px' }} onClick={() => deleteTab(tabAdded.toString())} className="btnDelete">
                                {' '}  x
                            </button>
                        </div>
                    } >
                        <Terminal />
                    </Tab>
                })
            }
            <Tab eventKey="+" title="+" ></Tab>
        </Tabs>
    )
}

export default TabsComponent
