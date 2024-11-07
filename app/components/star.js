const Star = ({ filled, fillPercentage = 100, onClick, onMouseEnter, onMouseLeave }) => {
    return (
      <span
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          cursor: 'pointer',
          fontSize: '24px',
          color: '#ccc', // Base color for empty stars
          position: 'relative',
          display: 'inline-block',
          width: '24px',
        }}
      >
        {/* Conditionally render partially filled stars only if fillPercentage is less than 100 */}
        {fillPercentage < 100 ? (
          <>
            <span style={{ position: 'absolute', width: `${fillPercentage}%`, overflow: 'hidden', color: '#FFD700' }}>
              ★
            </span>
            <span>★</span>
          </>
        ) : (
          <span style={{ color: filled ? '#FFD700' : '#ccc' }}>★</span> // Fully filled or empty based on filled prop
        )}
      </span>
    );
  };
  
  export default Star;
  