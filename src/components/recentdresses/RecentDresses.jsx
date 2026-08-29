import { useState } from "react";
import DressCard from "../dresscard/DressCard";
import "./RecentDresses.css";

function RecentDresses({ dresses }) {
    return (
        <div className="recent-container">
            <h2> Recent dresses </h2>
            <section className="recentItem">
              
                {dresses.length === 0 ? (
                    <p className="no-dresses-msg">No dresses available yet.</p>
                ) : (
                    <div className="previewGrid">
                        {dresses.map((item) => (
                            <DressCard key={item.id} dress={item} />
                        ))}
                    </div>
                )}
            </section>

        </div>
    )
}

export default RecentDresses;