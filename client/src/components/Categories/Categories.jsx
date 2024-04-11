import React from "react";
import "./Categories.css";

export default function Categories({heading, categories}){
    return (
        <section className="categories">
            <h3>{heading}</h3>
            <section className="categoriesContainer">
                {categories.map(category => (<div>
                    <div className="category">
                        <h4>{category.name}</h4>
                        <p>{category.total}</p>
                    </div>
                    <div>
                        <div style={{width: category.percent}} className="bar"></div>
                    </div>
                </div>))}
            </section>
        </section>
    )
}