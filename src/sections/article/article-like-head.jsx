
import TableHead from '@mui/material/TableHead';




// ----------------------------------------------------------------------

export default function LikeHead() {


    return (
        <TableHead style={{ justifyContent: 'start', display: 'flex', marginTop: '10px', height: '40px', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold' }}>Liked people</div>
        </TableHead>
    );
}


