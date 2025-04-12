import React from 'react';
import PropTypes from 'prop-types';

const TreeView = ({ data }) => {
    const renderTree = (node, level = 0) => {
        if (typeof node !== 'object' || node === null) {
            return <div className="tree-leaf" style={{ marginLeft: `${level * 20}px` }}>
                <span className="tree-value">{JSON.stringify(node)}</span>
            </div>;
        }

        return (
            <div className="tree-branch" style={{ marginLeft: `${level * 20}px` }}>
                {Array.isArray(node) ? (
                    node.map((item, index) => (
                        <div key={index} className="tree-node">
                            <span className="tree-label">[{index}]</span>
                            {renderTree(item, level + 1)}
                        </div>
                    ))
                ) : (
                    Object.entries(node).map(([key, value], index) => (
                        <div key={index} className="tree-node">
                            <span className="tree-label">{key}:</span>
                            {renderTree(value, level + 1)}
                        </div>
                    ))
                )}
            </div>
        );
    };

    return (
        <div className="tree-container">
            {renderTree(data)}
        </div>
    );
};

TreeView.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]).isRequired
};

export default TreeView;
