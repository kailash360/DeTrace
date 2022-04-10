import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Constants from '../../Constants'
import HandymanIcon from '@mui/icons-material/Handyman';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import { AuthContext } from '../../context/AuthContext'
import { ContractContext } from '../../context/ContractContext'
import './TimelineFeedItem.css'


const TimelineFeedItem = ({ product, stage }) => {

    const { Services } = React.useContext(ContractContext)
    const { account, role } = React.useContext(AuthContext)
    const [manufacturedDate, setManufacturedDate] = React.useState('')
    const [releasedDate, setReleasedDate] = React.useState('')
    const [soldDate, setSoldDate] = React.useState('')

    const getHistory = async () => {
        if (!account) return;

        const response = await Services.getProductHistory(product.details.id)
        let date1 = new Date(parseInt(response.data.history[0].returnValues._time)).toLocaleString('hi')
        setManufacturedDate(date1);
        if(stage != Constants.STAGE[0]){
            let date2 = new Date(parseInt(response.data.history[1].returnValues._time)).toLocaleString('hi')
            setReleasedDate(date2);
        }
        if(stage ==Constants.STAGE[2]){
            let date3 = new Date(parseInt(response.data.history[2].returnValues._time)).toLocaleString('hi')
            setSoldDate(date3);
        }
        console.log({ response });
    }

    React.useEffect(() => {
        getHistory()
    }, [account, Services])


    return (
        <div>
            <VerticalTimeline lineColor='black'>
                {/* Manufacturer  */}
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#ff7043', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  #ff7043' }}
                    date={manufacturedDate}
                    iconStyle={{ background: '#ff7043', color: '#fff' }}
                    icon={<HandymanIcon />}
                >
                    <h1 className="vertical-timeline-element-title">Product Manufactured</h1>
                    <h3 className="vertical-timeline-element-subtitle">{product.manufacturer.name}</h3>
                    <p style={{ backgroundColor: 'white', color: 'black', borderRadius: '10px', width: 'fit-content', padding: '3px 6px' }} className="vertical-timeline-element-subtitle">Manufacturer</p>
                    <p><b>Address:</b> {product.manufacturer.id}</p>
                </VerticalTimelineElement>
                {/* Retailer  */}
                {
                    stage == Constants.STAGE[1] || stage == Constants.STAGE[2] ?
                        product.retailers.map((retailer, index) =>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                date={releasedDate}
                                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                icon={<StorefrontIcon />}
                            >
                                <h1 className="vertical-timeline-element-title">Product Released</h1>
                                <h4 className="vertical-timeline-element-subtitle">{retailer.name}</h4>
                                <p style={{ backgroundColor: 'white', color: 'black', borderRadius: '10px', width: 'fit-content', padding: '3px 6px' }} className="vertical-timeline-element-subtitle">Retailer</p>
                                <p><b>Address:</b> {retailer.id}</p>
                            </VerticalTimelineElement>
                        )

                        : ''
                }

                {/* Customer  */}
                {
                    stage == Constants.STAGE[2] ?
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            date={soldDate}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(16, 204, 82)' }}
                            contentStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                            iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                            icon={<PersonIcon />}
                        >
                            <h1 className="vertical-timeline-element-title">Product Sold</h1>
                            <h3 className="vertical-timeline-element-subtitle">{product.customer.name}</h3>
                            <p style={{ backgroundColor: 'white', color: 'black', borderRadius: '10px', width: 'fit-content', padding: '3px 6px' }} className="vertical-timeline-element-subtitle">Customer</p>
                            <p><b>Address:</b> {product.customer.id}</p>
                        </VerticalTimelineElement>

                        : ''
                }
            </VerticalTimeline>
        </div>
    )
}

export default TimelineFeedItem
