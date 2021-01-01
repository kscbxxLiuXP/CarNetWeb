import React from 'react';

import { Tag } from 'antd'

const { CheckableTag } = Tag;


class TagFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTags: this.props.tags,
            checkedALL: false,
        }
    }

    //子标签被点击
    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        this.setState({ selectedTags: nextSelectedTags });
        this.props.onFilterChange(nextSelectedTags)
    }

    //全选标签被点击
    handleChangeALL(checked) {
        var selectedTags = [];
        if (checked) {
            this.setState({ selectedTags: this.props.tags })
            selectedTags = this.props.tags;
        } else {
            this.setState({ selectedTags: [] })

        }
        this.props.onFilterChange(selectedTags)
    }

    render() {
        const { selectedTags } = this.state;
        return (
            <>
                <CheckableTag
                    key="all"
                    checked={selectedTags.length === this.props.tags.length}
                    onChange={checked => this.handleChangeALL(checked)}
                >
                    全部
                        </CheckableTag>
                {this.props.tags.map(tag => (
                    <CheckableTag
                        key={tag}
                        checked={selectedTags.indexOf(tag) > -1}
                        onChange={checked => this.handleChange(tag, checked)}
                    >
                        {tag}
                    </CheckableTag>
                ))}
            </>
        )
    }
}
export default TagFilter;