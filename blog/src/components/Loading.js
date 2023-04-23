function Loading({ err, name }) {
    return (<p className="mt-4">{err ? err + ' ' + name : 'Loading ' + name + '...'}</p>);
}

export default Loading;