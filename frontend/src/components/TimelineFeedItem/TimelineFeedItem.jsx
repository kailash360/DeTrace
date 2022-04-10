import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Constants from '../../Constants'
import HandymanIcon from '@mui/icons-material/Handyman';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';

const TimelineFeedItem = ({ product, stage }) => {
    return (
        <div>
            <VerticalTimeline lineColor='black'>
                {/* Manufacturer  */}
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#ff7043', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  #ff7043' }}
                    date="2011 - present"
                    iconStyle={{ background: '#ff7043', color: '#fff' }}
                    icon={<HandymanIcon />}
                >
                    <h1 className="vertical-timeline-element-title">Manufacturer</h1>
                    <h3 className="vertical-timeline-element-subtitle">{product.manufacturer.name}</h3>
                    <p><b>Address:</b> {product.manufacturer.id}</p>
                </VerticalTimelineElement>
                {/* Retailer  */}
                {
                    stage == Constants.STAGE[1] || stage == Constants.STAGE[2] ?
                        product.retailers.map((retailer, index) =>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                date="2010 - 2011"
                                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                icon={<StorefrontIcon />}
                            >
                                <h1 className="vertical-timeline-element-title">Retailer {index + 1}</h1>
                                <h4 className="vertical-timeline-element-subtitle">{retailer.name}</h4>
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
                    date="2006 - 2008"
                    contentArrowStyle={{ borderRight: '7px solid  rgb(16, 204, 82)' }}
                    contentStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                    icon={<PersonIcon/>}
                >
                    <h1 className="vertical-timeline-element-title">Customer</h1>
                    <h3 className="vertical-timeline-element-subtitle">{product.customer.name}</h3>
                    <p><b>Name:</b> {product.customer.name}</p>
                <p><b>Address:</b> {product.customer.id}</p>
                </VerticalTimelineElement>

                    : ''
                }
            </VerticalTimeline>
        </div>
    )
}

export default TimelineFeedItem
