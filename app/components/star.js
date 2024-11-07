const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => {
    return (
        <span
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ cursor: 'pointer', fontSize: '24px', color: filled ? '#FFD700' : '#ccc' }}
        >
        ★
        </span>
    );
};

export default Star;
