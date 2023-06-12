import React, { SetStateAction, useCallback, useRef, useState } from 'react'
import "./style.scss";
import ReactFlow, { Controls, Background, applyEdgeChanges, applyNodeChanges, addEdge, ReactFlowProvider, MarkerType, updateEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { ReactComponent as FilterIcon } from "../../assets/icons/flow/filter.svg";
import {ReactComponent as EnrichmentIcon} from "../../assets/icons/flow/enrichment.svg";
import {ReactComponent as TransformationIcon} from "../../assets/icons/flow/transformation.svg";
import {ReactComponent as ChangeOriginatorIcon} from "../../assets/icons/flow/change-originator.svg";
import {ReactComponent as AlarmIcon} from "../../assets/icons/flow/alarm.svg";
import {ReactComponent as AmazonIcon} from "../../assets/icons/flow/amazon.svg";
import {ReactComponent as CopyKeysIcon} from "../../assets/icons/flow/copy-keys.svg";
import {ReactComponent as DeleteKeysIcon} from "../../assets/icons/flow/delete-keys.svg";
import {ReactComponent as DeviceProfileIcon} from "../../assets/icons/flow/device-profile.svg";
import {ReactComponent as KafkaIcon} from "../../assets/icons/flow/kafka.svg";
import {ReactComponent as LogIcon} from "../../assets/icons/flow/log.svg";
import {ReactComponent as MathFunctionIcon} from "../../assets/icons/flow/math-function.svg";
import {ReactComponent as MqttIcon} from "../../assets/icons/flow/mqtt.svg";
import {ReactComponent as ScriptIcon} from "../../assets/icons/flow/script.svg";
import {ReactComponent as RestApiIcon} from "../../assets/icons/flow/rest-api.svg";
import {ReactComponent as RabiteMqIcon} from "../../assets/icons/flow/rabitemq.svg";
import {ReactComponent as rpcIcon} from "../../assets/icons/flow/rpc.svg";
import {ReactComponent as SendEmailIcon} from "../../assets/icons/flow/send-email.svg";
import {ReactComponent as PlusIcon} from "../../assets/icons/flow/plus.svg";
import {ReactComponent as ActionIcon} from "../../assets/icons/flow/action.svg";
import {ReactComponent as ClearAlertIcon} from "../../assets/icons/flow/clear-alarm.svg";
import {ReactComponent as DelayIcon} from "../../assets/icons/flow/delay.svg";
import {ReactComponent as FlowIcon} from "../../assets/icons/flow/flow.svg";
const randomNumberBetween = (number1:number, number2:number) => {
    return Math.floor(Math.random() * (number2 - number1 + 1) + number1);
}

const ArrowLeftIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.47332 3.52677C5.41084 3.58875 5.36124 3.66248 5.32739 3.74372C5.29355 3.82496 5.27612 3.91209 5.27612 4.0001C5.27612 4.08811 5.29355 4.17525 5.32739 4.25649C5.36124 4.33773 5.41084 4.41146 5.47332 4.47343L8.52665 7.52677C8.58913 7.58874 8.63873 7.66248 8.67258 7.74372C8.70642 7.82496 8.72385 7.91209 8.72385 8.0001C8.72385 8.08811 8.70642 8.17525 8.67258 8.25649C8.63873 8.33773 8.58913 8.41146 8.52665 8.47344L5.47332 11.5268C5.41084 11.5887 5.36124 11.6625 5.32739 11.7437C5.29355 11.825 5.27612 11.9121 5.27612 12.0001C5.27612 12.0881 5.29355 12.1752 5.32739 12.2565C5.36124 12.3377 5.41084 12.4115 5.47332 12.4734C5.59823 12.5976 5.7672 12.6673 5.94332 12.6673C6.11944 12.6673 6.28841 12.5976 6.41332 12.4734L9.47331 9.41344C9.84785 9.03843 10.0582 8.5301 10.0582 8.0001C10.0582 7.4701 9.84785 6.96177 9.47331 6.58677L6.41332 3.52677C6.28841 3.4026 6.11944 3.33291 5.94332 3.33291C5.7672 3.33291 5.59823 3.4026 5.47332 3.52677Z"
        fill="#4E5064"
      />
    </svg>
  );

  
function NavContent(props:{
    data:any
    setInitiaNodes:React.Dispatch<SetStateAction<any[]>>
    setInitialEdges:React.Dispatch<SetStateAction<any[]>>
    initialNodes:any[]
    initialEdges:any[]
}) {

  const isActive = true;
  const [open, setOpen] = useState<boolean>(isActive);
  const { data } = props;
  const { name, icon, children } = data;

  return (
    <div>
      <div
        className="router-link "
        onClick={(e) => {
            setOpen((curr) => !curr);
        }}
      >
        <span className="icon">{icon}</span>
        <span
          className="label"
          style={{
            color: isActive ? "#4E5064" : "", 
          }}
        >
         {name}
        </span>
        {children && children?.length > 0 && (
          <span
            style={{
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.5s",
            }}
          >
            <ArrowLeftIcon />
          </span>
        )}
      </div>
         <div
         className="sub-routes"
         style={{
           maxHeight: open ? (children?.length || 0) * 70 : 0,
           display: open ? "flex" : "none",
           gap: 5,
          flexDirection: "column",
         }}
       >
            {children?.map((child: any) => {
                const { element,color,label,icon } = child;
                return (
                  <div
                  onClick={()=>{
                    props.setInitiaNodes([...props.initialNodes,{
                        id: (props.initialNodes.length + 1)+'',
                        type:'selectorNode',
                        style: { background: color || '#d20d0d', color: '#4E5064', border: '1px solid #4E5064', width: 170, height: 30 },
                        position: { x: randomNumberBetween(10,100), y: randomNumberBetween(10,100) },
                        data: { label: <div
                        style={{
                            width:'100%',
                            height:'80%',
                            display:'flex',
                            justifyItems:'left',
                            alignItems:'center',
                            gap:8,
                        }}
                        >
                           <span>{icon}</span>
                           <span>{label}</span>
                        </div>},               
                    }])
                }}
                  >
                        {element}
                  </div>
                  
                );
            })}
       </div>
    </div>
    );
}

const data = [
    {
        elements:{
            name:"filter",
            icon:<FilterIcon/>,
            children:[
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDEEA9'}}>
                        <span><FilterIcon/></span>
                        <span>Check alarm status</span>
                    </div>
                    ),
                    color:'#FDEEA9',
                    label:'Check alarm status',
                    icon:<FilterIcon/>
                },{
                    element:
                    (
                    <div className='card' style={{background:'#FDEEA9'}}>
                        <span><FilterIcon/></span>
                        <span>Check alarm status</span>
                    </div>
                    ),
                    color:'#FDEEA9',
                    label:'Check alarm status',
                    icon:<FilterIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDEEA9'}}>
                        <span><FilterIcon/></span>
                        <span>Check existence fields</span>
                    </div>
                    ),
                    color:'#FDEEA9',
                    label:'Check existence fields',
                    icon:<FilterIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDEEA9'}}>
                        <span><FilterIcon/></span>
                        <span>Check relation</span>
                    </div>
                    ),
                    color:'#FDEEA9',
                    label:'Check relation',
                    icon:<FilterIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDEEA9'}}>
                        <span><FilterIcon/></span>
                        <span>Gps geofencing filter</span>
                    </div>
                    ),
                    color:'#FDEEA9',
                    label:'Gps geofencing filter',
                    icon:<FilterIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDEEA9'}}>
                        <span><FilterIcon/></span>
                        <span>Message type</span>
                    </div>),
                    color:'#FDEEA9',
                    label:'Message type',
                    icon:<FilterIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDEEA9'}}>
                        <span><FilterIcon/></span>
                        <span>Message type switch</span>
                    </div>
                    ),
                    color:'#FDEEA9',
                    label:'Message type switch',
                    icon:<FilterIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDEEA9'}}>
                        <span><FilterIcon/></span>
                        <span>Originator type</span>
                    </div>
                    ),
                    color:'#FDEEA9',
                    label:'Originator type',
                    icon:<FilterIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDEEA9'}}>
                        <span><FilterIcon/></span>
                        <span>Originator type switch</span>
                    </div>
                    ),
                    color:'#FDEEA9',
                    label:'Originator type switch',
                    icon:<FilterIcon/>

                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDEEA9'}}>
                        <span><FilterIcon/></span>
                        <span>Script</span>
                    </div>
                    ),
                    color:'#FDEEA9',
                    label:'Script',
                    icon:<FilterIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDEEA9'}}>
                        <span> <FilterIcon/></span>
                        <span>Switch</span>
                    </div>
                    ),
                    color:'#FDEEA9',
                    label:'Switch',
                    icon:<FilterIcon/>
                }
            ]
        },
       
    },
    {
        elements:{
            name:"Enrichment",
            icon:<EnrichmentIcon/>
            ,
            children:[
                {
                    element:(
                    <div className='card' style={{background:'#C9FDA9'}}>
                        <span><EnrichmentIcon/></span>
                        <span>Check alarm status</span>
                    </div>
                    ),
                    color:'#C9FDA9',
                    label:'Check alarm status',
                    icon:<EnrichmentIcon/>
                },{
                    element:
                    (
                    <div className='card' style={{background:'#C9FDA9'}}>
                        
                            <span><EnrichmentIcon/></span>
                            <span>Calculate delta</span>
                    </div>),
                    color:'#C9FDA9',
                    label:'Calculate delta',
                    icon:<EnrichmentIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#C9FDA9'}}>
                        
                           <span><EnrichmentIcon/></span> 
                            <span>Customer attributes</span>
                    </div>
                    ),
                    color:'#C9FDA9',
                    label:'Customer attributes',
                    icon:<EnrichmentIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#C9FDA9'}}>
                        
                           <span> <EnrichmentIcon/></span>
                            <span>Customer details</span>
                    </div>
                    )
                    ,
                    color:'#C9FDA9',
                    label:'Customer details',
                    icon:<EnrichmentIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#C9FDA9'}}>
                        <span>
                        <EnrichmentIcon/>
                        </span>
                        <span>Fetch device credentials</span>
                    </div>
                    )
                    ,
                    color:'#C9FDA9',
                    label:'Fetch device credentials',
                    icon:<EnrichmentIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#C9FDA9'}}>
                            <span><EnrichmentIcon/></span>
                          <span>Originator attributes</span>  
                    </div>
                    ),
                    color:'#C9FDA9',
                    label:'Originator attributes',
                    icon:<EnrichmentIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#C9FDA9'}}>
                        <span><EnrichmentIcon/></span>
                           <span>Originator fields</span> 
                    </div>
                    ),
                    color:'#C9FDA9',
                    label:'Originator fields',
                    icon:<EnrichmentIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#C9FDA9'}}>
                        <span>
                        <EnrichmentIcon/>
                        </span>
                        <span>
                            Originator telemetry</span>
                    </div>
                    ),
                    color:'#C9FDA9',
                    label:'Originator telemetry',
                    icon:<EnrichmentIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#C9FDA9'}}>
                        <span>
                        <EnrichmentIcon/>
                        </span>
                        <span>
                            Related attributes</span>
                    </div>
                    ),
                    color:'#C9FDA9',
                    label:'Related attributes',
                }
            ]
        },
    },
    {
        elements:{
            name:"Transformation",
            icon:<TransformationIcon/>,
            children:[
                {
                    element:
                    (
                    <div className='card' style={{background:'#A9EEFD'}}>
                        <span><ChangeOriginatorIcon/></span>
                        <span>Change originator</span>
                    </div>
                    ),
                    color:'#A9EEFD',
                    label:'Change originator',
                    icon:<ChangeOriginatorIcon/>
                },{
                    element:
                    (
                    <div className='card' style={{background:'#A9EEFD'}}>
                        <span><CopyKeysIcon/></span>
                        <span>Copy keys</span>
                    </div>
                    ),
                    color:'#A9EEFD',
                    label:'Copy keys',
                    icon:<CopyKeysIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#A9EEFD'}}>
                        <span><DeleteKeysIcon/></span>
                        <span>Delete keys</span>
                    </div>
                    ),
                    color:'#A9EEFD',
                    label:'Delete keys',
                    icon:<DeleteKeysIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#A9EEFD'}}>
                        <span><FilterIcon/></span>
                        <span>Json path</span>
                    </div>
                    ),
                    color:'#A9EEFD',
                    label:'Json path',
                    icon:<FilterIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#A9EEFD'}}>
                          <span><ChangeOriginatorIcon/></span>
                        <span>Rename keys</span>
                    </div>
                    ),
                    color:'#A9EEFD',
                    label:'Rename keys',
                    icon:<ChangeOriginatorIcon/>

                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#A9EEFD'}}>
                        <span><ScriptIcon/></span>
                        <span>script</span>
                    </div>
                    ),
                    color:'#A9EEFD',
                    label:'script',
                    icon:<ScriptIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#A9EEFD'}}>
                        <span><SendEmailIcon/></span>
                        <span>to email</span>
                    </div>
                    ),
                    color:'#A9EEFD',
                    label:'to email',
                    icon:<SendEmailIcon/>

                },
            ]
        },
    },
    {
        elements:{
            name:"Action",
            icon:<ActionIcon/>,
            children:[
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDA9A9'}}>
                        <span><PlusIcon/></span>
                        <span>Assign to customer</span>
                    </div>
                    ),
                    color:'#FDA9A9',
                    label:'Assign to customer',
                    icon:<PlusIcon/>
                },{
                    element:
                    (
                    <div className='card' style={{background:'#FDA9A9'}}>
                        <span><ClearAlertIcon/></span>
                        <span>clear alarm</span>
                    </div>
                    ),
                    color:'#FDA9A9',
                    label:'clear alarm',
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDA9A9'}}>
                        <span><CopyKeysIcon/></span>
                        <span>copy to view</span>
                    </div>
                    ),
                    color:'#FDA9A9',
                    label:'copy to view',
                    icon:<CopyKeysIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDA9A9'}}>
                         <span><PlusIcon/></span>
                        <span>create alarm</span>
                    </div>
                    ),
                    color:'#FDA9A9',
                    label:'create alarm',
                    icon:<PlusIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDA9A9'}}>
                        <span><DelayIcon/></span>
                        <span>Delay(deprecated)</span>
                    </div>
                    ),
                    color:'#FDA9A9',
                    label:'Delay(deprecated)',
                    icon:<DelayIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDA9A9'}}>
                        <span><DeleteKeysIcon/></span>
                        <span>Delete Attributes</span>
                    </div>
                    ),
                    color:'#FDA9A9',
                    label:'Delete Attributes',
                    icon:<DelayIcon/>

                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDA9A9'}}>
                        <span><DeleteKeysIcon/></span>
                        <span>Delete relation</span>
                    </div>
                    ),
                    color:'#FDA9A9',
                    label:'Delete relation',
                    icon:<DeleteKeysIcon/>

                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDA9A9'}}>
                        <span><DeviceProfileIcon/></span>
                        <span>Device Profile</span>
                    </div>
                    ),
                    color:'#FDA9A9',
                    label:'Device Profile',
                    icon:<DeviceProfileIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDA9A9'}}>
                        <span><LogIcon/></span>
                        <span>Log</span></div>
                    ),
                    color:'#FDA9A9',
                    label:'Log',
                    icon:<LogIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDA9A9'}}>
                        <span><LogIcon/></span>
                        <span>Math function</span>
                    </div>
                    ),
                    color:'#FDA9A9',
                    label:'Math function',
                    icon:<LogIcon/>
                },
            ]
        },
       
    },
    {
        elements:{
            name:"Enrichment",
            icon:<EnrichmentIcon/>
            ,
            children:[
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDD6A9'}}>
                        <span><AmazonIcon/></span>
                        <span>Aws cns</span>
                    </div>
                    ),
                    color:'#FDD6A9',
                    label:'Aws cns',
                    icon:<AmazonIcon/>
                },{
                    element:
                    (
                    <div className='card' style={{background:'#FDD6A9'}}>
                        <span><AmazonIcon/></span>
                        <span>Aws sqs</span>
                    </div>
                    ),
                    color:'#FDD6A9',
                    label:'Aws sqs',
                    icon:<AmazonIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDD6A9'}}>
                        <span><KafkaIcon/></span>
                        <span>Kafka</span>
                    </div>
                    ),
                    color:'#FDD6A9',
                    label:'Kafka',
                    icon:<KafkaIcon/>
                },
                {
                    element:
                    ( 
                    <div className='card' style={{background:'#FDD6A9'}}>
                        <span><MqttIcon/></span>
                        <span>Mqtt</span>
                    </div>
                    ),
                    color:'#FDD6A9',
                    label:'Mqtt',
                    icon:<MqttIcon/>
                },

                {
                    element:
                    (
                    <div className='card' style={{background:'#FDD6A9'}}>
                        <span><RabiteMqIcon/></span>
                        <span>Rabbitmq</span>
                    </div>
                    ),
                    color:'#FDD6A9',
                    label:'Rabbitmq',
                    icon:<RabiteMqIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDD6A9'}}>
                        <span><SendEmailIcon/></span>
                        <span>send email</span>
                    </div>
                    ),
                    color:'#FDD6A9',
                    label:'send email',
                    icon:<SendEmailIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDD6A9'}}>
                        <span><SendEmailIcon/></span>
                        <span>send sms</span>
                    </div>
                    ),
                    color:'#FDD6A9',
                    label:'send sms',
                    icon:<SendEmailIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#FDD6A9'}}>
                        <span><RestApiIcon/></span>
                        <span>rest Api</span>
                    </div>
                    ),
                    color:'#FDD6A9',
                    label:'send to kafka',
                    icon:<RestApiIcon/>

                }
            ]
        },
    },
    {
        elements:{
            name:"Flow",
            icon:<FlowIcon/>,
            children:[
                {
                    element:
                    (
                    <div className='card' style={{background:'#E2A9FD'}}>
                        <span><FlowIcon/></span>
                        <span>Acknowledge</span>
                    </div>
                    ),
                    color:'#E2A9FD',
                    label:'Acknowledge',
                    icon:<FlowIcon/>
                },{
                    element:
                    (
                    <div className='card' style={{background:'#E2A9FD'}}>
                        <span><FlowIcon/></span>
                        <span>Checkpoint</span>
                    </div>
                    ),
                    color:'#E2A9FD',
                    label:'Checkpoint',
                    icon:<FlowIcon/>
                },
                {
                    element:
                    (
                    <div className='card' style={{background:'#E2A9FD'}}>
                        <span><FlowIcon/></span>
                        <span>Output</span>
                    </div>
                    ),
                    color:'#E2A9FD',
                    label:'Output',
                    icon:<FlowIcon/>
                },

                {
                    element:
                    (
                    <div className='card' style={{background:'#E2A9FD'}}>
                        <span> <FlowIcon/></span>
                        <span>Rule chain</span>
                    </div>
                    ),
                    color:'#E2A9FD',
                    label:'Rule chain',
                    icon:<FlowIcon/>
                },
            ]
        },
    }
]

const connectionLineStyle = {
    strokeWidth: 3,
    stroke: 'black'
  };
  const defaultEdgeOptions = {
    style: { strokeWidth: 3, stroke: 'black' },
    type: 'floating',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'black',
    },
  };

function Flow() {
    const [initiaNodes,setInitiaNodes ]= useState([]);

    const CustomNode = ({ data }) => {
        return (
          <div className="custom-node" style={{
            background: data.color ||'#F8C3CD',
            color: '#FFF',
            width: 150,
            padding: 8,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            display: 'flex',
          }}>
            {JSON.stringify(data)}
           {/* <span> {data.icon? data.icon :"------" }</span>
            <span>{data.label}</span> */}
          </div>
        );
      };
      const nodeTypes = {
        special: CustomNode,
      };
    const edgeUpdateSuccessful = useRef(true);
    const [initialEdges,setInitialEdges]  = useState([]);

    const onNodesChange = useCallback(
        (changes:any) => setInitiaNodes((nds:any) =>applyNodeChanges(changes, nds)),
        []
        );
      const onEdgesChange = useCallback(
        (changes:any) => setInitialEdges((eds:any) => applyEdgeChanges(changes, eds)),
        []
        );
        const onConnect = useCallback((params:any) => setInitialEdges((eds:any) => addEdge({...params,
             type: 'floating'
        }, eds)), []);

        const onEdgeUpdateStart = useCallback(() => {
            edgeUpdateSuccessful.current = false;
        }, []);

        const onEdgeUpdate = useCallback((oldEdge:any, newConnection:any) => {
            edgeUpdateSuccessful.current = true;
            setInitialEdges((els:any) => updateEdge(oldEdge, newConnection, els));
        }, []);

        const onEdgeUpdateEnd = useCallback((_, edge:any) => {
            if (!edgeUpdateSuccessful.current) {
                setInitialEdges((eds) => eds.filter((e:{
                    id:number,
                    [key:string]:any
                }) => e.id !== edge.id));
            }

            edgeUpdateSuccessful.current = true;
        }, []);
  return (
    <ReactFlowProvider>
    <div className='w-full h-full flex'>
        <div className={`nav-open`}> 
            <span className='text'>Rule chains</span>
            <div style={{
                backgroundColor: '#fff',
                width: '100%',
                height: '40px',
                borderRadius: '5px',
                padding:'10px',
                display: 'flex',
                alignItems: 'center',
                marginTop: '10px',
            }}>
                <input type="text" placeholder='shaerch nodes'/>
            </div>
                {
                data.map((item:any)=>{
                    return (
                     <div 
                     style={{
                        marginTop: '10px',
                    }}
                     >
                    <NavContent data={item.elements} setInitiaNodes={setInitiaNodes}  setInitialEdges={setInitialEdges} 
                    initialNodes={initiaNodes} initialEdges={initialEdges}
                    />
                    </div>)
                })
                }   
        </div>
        <div className='flex-1'>
        <ReactFlow 
            nodes={initiaNodes}
            onNodesChange={onNodesChange}
            edges={initialEdges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            snapToGrid={true}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            snapGrid={[15, 15]}
            fitView={true}
            connectionLineStyle={connectionLineStyle}
            defaultEdgeOptions={defaultEdgeOptions}
         >
            <Background />
            <Controls />
        </ReactFlow>
        
        </div>
    </div>
    </ReactFlowProvider>
  )
}

export default Flow;