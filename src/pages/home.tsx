import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Button, Card, Col, Layout, Row } from 'antd';
import '../assets/style.css';
import { API_KEY, BASE_URL, HEADLINE } from '../assets/api';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

type News = {
    id: string;
    urlToImage: string;
    title: string;
    description: string;
    content: string;
}

export default function Home() {
    const [news, setNews] = useState<[] | News[]>([]);
    
    useEffect(() => {
        const getNews = async () => {
            const getData = await axios.get( BASE_URL+HEADLINE+'&apiKey='+API_KEY )
            const data = await getData;
            setNews(data.data.articles);
        }

        getNews();
    })

    const navigate = useNavigate()

    return (
        <>
            <Layout className='section'>
                <div className="container">
                    <Row gutter={20}>
                        { news.length === 0 ? (
                            <Col className='gutter-row' span={24}>
                                <Card>
                                    Loading ...
                                </Card>
                            </Col>
                        ) : (
                            news.map((val, i) => {
                                return <Col key={i} className='gutter-row' span={8}>
                                    <Card cover={
                                        <img
                                            alt="example"
                                            src={ val.urlToImage != null ? val.urlToImage : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" }
                                            className='card-image'
                                        />
                                    } style={{'marginBottom': '20px'}}>
                                        <h2 className='text-truncate'>{ val.title }</h2>
                                        <p className='text-truncate'>{ val.description }</p>
                                        <div style={{'display': 'flex'}}>
                                            <Button type='primary' shape='circle' icon={ <ArrowRightOutlined/> } onClick={() => navigate(`news-detail/${i}`)} style={{'marginLeft': 'auto'}} />
                                        </div>
                                    </Card>
                                </Col>
                            })
                        )}
                    </Row>
                </div>
            </Layout>
        </>
    )
}
