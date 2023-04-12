function Loading({ err, name }) {
    return (<p className="active">{err ? err + ' ' + name : 'Loading ' + name + '...'}</p>);
}

export default Loading;