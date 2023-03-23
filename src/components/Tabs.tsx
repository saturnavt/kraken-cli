import type { NextPage } from "next"
import { useEffect, useState } from "react"
import Terminal from "@/components/Terminal"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';

const TabsComponent: NextPage = () => {
    const [tabKey, setTabkey] = useState<string>("Terminal");
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

    const addBeginTab = () => {
        setTabsAdd(tabsAdd => [...tabsAdd, 1]);
        setTabkey("1");
    }

    const deleteTab = (tabToDelete: string) => {
        let deleteTabs = tabsAdd.filter(function (element) {
            return element.toString() !== tabToDelete;
        });
        setTabsAdd(deleteTabs);
    }

    // let initialized = false
    // useEffect(() => {
    //     if (!initialized) {
    //         initialized = true
    //         setTabsAdd(tabsAdd => [...tabsAdd, 1]);
    //         setTabkey("1");
    //     }
    // }, [])

    return (
        <>
            {
                tabsAdd.length == 0 ? <div className="defaultDiv"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAACXBIWXMAAAsTAAALEwEAmpwYAAADjElEQVR4nM2XS0hUURjHxywjLSrSCjJXNRAFBT1WSRBIi4JqkbSoVfSAKCgKol0oLVtI26hNRYjQJltGijk97EEk0TuDHpCiRrXo8atPv6tn7px753jnOM4fLsw93zn/73/Pme9xUikPAFYCTcBD4Dvj+AE8Ac4Cq334KlToYuAi8If8+AtcAWqnSuwq4IMhqAs4AdQDaX02AseA28a8T8DaYotdDgyogBdAg8OaTcAzXfNNPrhYYmcCPer4LlA9gbXzjN0W8ZWTq3bU6XF1+BlYlGD9AqBPOU5PjspxZxXG/7axAJ7tyvEFmOVXZbajreroFVBeAE8Z0KtcO/2qzHZ0Tp00e+A6o1wtftTZnWTUSYMHrs3Kdd+POruTIFiWeuCqU66+JIsl3bQAz/U5L1XMMi8ou1UeBFcq10+LrRZoBYb1aZPcHxirgXeWUvpeUlCIaNij4DnKNWgR22/RI2NLUtoLCO4A64ENQLeOXQiRye4LVnhqmAS9oXHZWcENFS9Pu45dSxkldlmo9Ar6Q2SXdfyIxwJ0KeIUx5okiRkdG5SXl9IPWAhHEBpr1GFpGacVIHa6cVo78vnVcWkDuoPqVeEouMLIFHuMcenUOmMEdpl24KDROJW7CM6LmC89oKY30gjpWCfQEcPVGdiB2cBH5djt6tdFcJDCsjoq2RG9WQhOJuBt0rXStZWFbHPVNpxE8CNdvMViq9cbxCBQMwHOWr02/QbWWOy71GcmieBTurjH1lEB19W+bwKch3TNVYutBnit9qNJBFdpBhE81evOyBFKhtA8KTicQHBHsAkqdC/wVm2Pg9hIIjptfDX6vx7QKw56vHXG/HvmcZL7vtDI+zY8GKlmhUADodlSvqWR3xYX4VgiHlinH/JLzfIBt4D9wIyCxEb8TebLE2HPK9g7Qp1SFDIRRx4rGGO+/o5CdoeWR6ytUwqj21Fg5LuW2nwY7dBiBGd1Sg6nESnI5T0KOR1azMScTmkqBOd0aIkmFFmwABiybqCKvanG1lTpCG7TJe1j98hQtPabjXwJCE4DXw19mSBahzTgnMUWQ7BAsoQEnmocyU6JUQzBiRAuEL4FE8GfGLZotWUVB8FDLjw+BGdFa1RWcRDc5sLjQ3A4Wq1ZxUFw2oXHl2gzWq1ZxeU/iwNP0eAaZCWBiCAcCgdZSSAmCNvMIEuVAuJKO7bSOtXIV9q9ltb/hP8AdoMT4gSQXF0AAAAASUVORK5CYII="></img> <p style={{ color: "white", marginLeft: '-11px' }}>Kraken cli</p><button onClick={() => addBeginTab()} style={{marginLeft: '-38px'}}> {' '}  <a style={{ color: 'white' }}>+ New Terminal</a></button></div> : <Tabs
                    // defaultActiveKey={tabKey}
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    // defaultValue={"1"}
                    activeKey={tabKey}
                    onSelect={(e) => addTab(e)}

                >
                    {
                        tabsAdd.map((tabAdded) => {
                            return <Tab eventKey={tabAdded.toString()} title={
                                <div className="divAdded">
                                    {"Terminal " + tabAdded.toString()}
                                    <button style={{ color: 'grey', marginLeft: '15px', float: 'right', marginTop: '.1px' }} className="btnDelete">
                                        {' '}  <a style={{ color: 'white' }}></a>
                                    </button>
                                    <button style={{ color: 'grey', marginLeft: '15px', float: 'right', marginTop: '.1px' }} onClick={() => deleteTab(tabAdded.toString())} className="btnDelete">
                                        {' '}  <a style={{ color: 'white' }} >{' '} x</a>
                                    </button>
                                    {/* <button style={{ color: 'grey', marginLeft: '15px', float: 'right', marginTop: '.1px' }} className="btnDelete">
                                {' '}  <a style={{ color: 'white' }}>...</a>
                            </button> */}
                                </div>
                            }>
                                <Terminal />
                            </Tab>
                        })
                    }
                    <Tab eventKey="+" title="+" ></Tab>
                </Tabs>
            }

        </>
    )
}

export default TabsComponent
