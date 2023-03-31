import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = (props) => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#e0e0e0"
        foregroundColor="#f2f2f2"
        {...props}
    >
        <rect x="-2" y="266" rx="10" ry="10" width="280" height="27" />
        <rect x="0" y="311" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="432" rx="10" ry="10" width="91" height="27" />
        <rect x="128" y="421" rx="25" ry="25" width="153" height="45" />
        <circle cx="140" cy="130" r="130" />
    </ContentLoader>
)

export default Skeleton