import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Button, Card, Col, Layout, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import '../assets/style.css';
import { API_KEY, BASE_URL, HEADLINE } from '../assets/api';
import { useNavigate, useParams } from "react-router-dom";

type News = {
    id: string;
    urlToImage: string;
    title: string;
    description: string;
    content: string;
}

export default function Detail() {
    const [news, setNews] = useState<[] | News[]>([]);
    
    useEffect(() => {
        const getNews = async () => {
            const getData = await axios.get( BASE_URL+HEADLINE+'&apiKey='+API_KEY )
            const data = await getData;
            setNews(data.data.articles);
        }

        getNews();
    })

    const navigate = useNavigate();

    const { getId } = useParams();

    return (
        <>
            <Layout className='section'>
                <div className="container">
                    { news.length === 0 ? (
                        <Row gutter={20}>
                            <Col className='gutter-row' span={24}>
                                <Card>
                                    Loading ...
                                </Card>
                            </Col>
                        </Row>
                    ) : (
                        news.filter((validate, check) => check.toString() == getId).map((val, i) => {
                            return <Row gutter={20} key={i}>
                                    <Col className='gutter-row' span={16}>
                                        <div style={{'display': 'flex'}}>
                                            <Button type="default" shape="circle" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
                                            <h2 style={{'marginLeft': '20px', 'marginBottom': '1em'}}>{ val.title }</h2>
                                        </div>
                                        <Card>
                                            <p>{ val.content }</p>
                                        </Card>
                                    </Col>
                                    <Col className='gutter-row' span={8}>
                                        <img
                                            alt="example"
                                            src={ val.urlToImage != '' ? val.urlToImage : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" }
                                            className='w-100 radius-8px shadow'
                                        />
                                    </Col>
                                </Row>
                            })
                        )}
                </div>
            </Layout>
        </>
    )
}
