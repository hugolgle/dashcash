

export default function Path(lePath: any) {
    const path = lePath.pathname
    const pathParts = path.split('/');
    return pathParts[1];
}