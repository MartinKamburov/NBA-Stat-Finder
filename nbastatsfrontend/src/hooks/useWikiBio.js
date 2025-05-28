import { useState, useEffect } from "react";

export default function useWikiBio(title) {
    const [info, setInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
    if (!title) return;

    const url = `https://en.wikipedia.org/api/rest_v1/page/mobile-sections/${encodeURIComponent(
        title
    )}`;

    fetch(url)
        .then((r) => {
        if (!r.ok) throw new Error("Page not found");
        return r.json();
        })
        .then((json) => {
        // mobile-sections puts the infobox in `lead.infobox.properties`
        const props = json.lead?.infobox?.properties || [];
        // map it into { key: value } pairs
        const obj = props.reduce((acc, { name, values }) => {
            // values is an array of { text,... }
            acc[name] = values.map((v) => v.text).join(" ");
            return acc;
        }, {});
        setInfo(obj);
        })
        .catch((e) => {
        console.error(e);
        setError(e);
        });
    }, [title]);

    return { info, error };
}