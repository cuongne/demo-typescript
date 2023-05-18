import { Popconfirm, Space, Tag, Tooltip } from "antd"
import { convertDateTime } from "@/utils/helper";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './style.scss'
import { useNavigate } from "react-router-dom";


type Item = {
    id: number;
    title: string;
    description: string;
    tagList: Array<string>;
    slug: string;
    [key: string]: any
}

type Props = {
    [key: string]: any,
    data: Array<Item>,
    onEdit: (event: React.MouseEvent<HTMLDivElement>, item: Item) => void,
    onDelete: (event: any, item: Item) => void;
}


const ArticleList = (props: Props) => {
    const { data, onEdit, onDelete } = props
    const navigate = useNavigate();
    const handleClick = (event: Item) => {
        navigate('/comment', {
            state: event
        })
    }

    return (
        <div className="article__list">
            {data?.map(x => <div key={x?.id} className="article__item" onClick={() => handleClick(x)}>
                <span className="article__title">{x?.title}</span>
                <span className="article__description">{x?.description}</span>
                <Space size={[0, 8]} wrap>
                    {x?.tagList?.map(item => (
                        <Tag key={crypto.randomUUID()}>{item}</Tag>
                    ))}
                </Space>
                <span className="article__create-by">Create by: {x?.author?.username} - {convertDateTime(x?.created)}</span>
                <div className="article__action">
                    <Tooltip title="Edit">
                        <div className="icon" onClick={(e) => onEdit(e, x)}>
                            <EditOutlined />
                        </div>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Popconfirm
                            title="Delete article!"
                            description="Are you sure to delete this article?"
                            onConfirm={(e) => onDelete(e, x)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <div className="icon">
                                <DeleteOutlined />
                            </div>
                        </Popconfirm>

                    </Tooltip>
                </div>
            </div>)}
        </div>
    )
}

export default ArticleList