import React, { Component } from 'react';
import { Card } from 'antd';
import ReactMarkdown from 'react-markdown'
import './style.css'
import CodeBlock from "./CodeBlock";
import HeadingBlock from "./HeadingBlock"

export default class Markdown extends Component {
    render() {
        const { md } = this.props;
        return (
            <div className="content">
                <Card style={{ backgroundColor: "rgba(0,0,0,0)" }} bordered={true}>
                    <ReactMarkdown
                        className="markdown"
                        source={md}
                        escapeHtml={false}
                        renderers={{
                            code: CodeBlock,
                            heading : HeadingBlock
                        }}
                    />
                </Card>
            </div >
        );
    }
}
