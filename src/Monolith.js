import React from "react";

const id_obj = (function* () {
    let i = 1;
    while (true) {
    yield i;
    i += 1;
    }
})();

class Monolith extends React.Component {

    state = {
        articles: [
            {
                id: id_obj.next(),
                title: "Article 1",
                summary: "Article 1 Summary",
                display: "none",
            },
            {
                id: id_obj.next(),
                title: "Article 2",
                summary: "Article 2 Summary",
                display: "none",
            },
            {
                id: id_obj.next(),
                title: "Article 3",
                summary: "Article 3 Summary",
                display: "none",
            },
            {
                id: id_obj.next(),
                title: "Article 4",
                summary: "Article 4 Summary",
                display: "none",
            },
        ],
        title: "",
        summary: "",
    };

    onChangeTitle = (e) => {
        this.setState({title: e.target.value });
    }

    onChangeSummary = (e) => {
        this.setState({summary: e.target.value });
    }

    onClickAdd = () => {
        this.setState((state) => ({
            articles: [
                ...state.articles,
                {
                    id: id_obj.next(),
                    title: state.title,
                    summary: state.summary,
                    display: "none"
                }
            ],
            title: "",
            summary: ""
        }))
    }

    onClickRemove = (id) => {
        this.setState((state) => ({
            ...state,
            articles: state.articles.filter((article) => article.id !== id)
        }))
    }

    onClickToggle = (id) => {
        this.setState((state) => {
            const articles = [...state.articles];
            const index = articles.findIndex((article) => article.id === id);

            articles[index] = {
                ...articles[index],
                display: articles[index].display ? "" : "none"
            }

            return {...state, articles};
        })
    }

    render() {
        const {articles, title, summary } = this.state;
        return (
            <section>
                <header>
                    <h1> Articles </h1>
                    <input placeholder="Title" value={title}
                    onChange={this.onChangeTitle}
                    />
                    <input placeholder="Summary" value={summary} onChange={this.onChangeSummary} />
                    <button onClick={this.onClickAdd}> Add </button>
                </header>
                <article>
                    <ul>
                        {articles.map((i) => (
                            <li key={i.id}>
                                <a href={`#${i.id.value}`}
                                title="Toggle Summary"
                                onClick={this.onClickToggle.bind(null, i.id)}>
                                    {i.title}
                                </a>
                                &nbsp;
                                <a href={`#${i.id.value}`} title="Remove"
                                onClick={this.onClickRemove.bind(null, i.id)}>
                                    &#10007;
                                </a>
                                <p style={{display: i.display}}>
                                    {i.summary}
                                    {i.id.value}
                                </p>
                            </li>
                        ))}
                    </ul>
                </article>
            </section>
        );
    }
}

export default Monolith;