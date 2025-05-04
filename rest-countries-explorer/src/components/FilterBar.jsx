import { TextField, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({ /* ...your styles... */ });
const StyledSelect = styled(Select)({ /* ...your styles... */ });

const FilterBar = ({
  searchQuery,
  selectedRegion,
  onSearchChange,
  onRegionChange,
}) => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <Box sx={{
      display: 'flex',
      gap: 2,
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: 'center',
      mb: 4,
      width: '100%',
      position: 'relative',
      px: { xs: 1, sm: 2 },
      py: 2,
      background: 'rgba(20, 10, 32, 0.85)',
      borderRadius: 3,
      boxShadow: '0 0 18px 2px #bb00ff55, 0 2px 8px rgba(0,0,0,0.5)',
      border: '1.5px solid rgba(187, 0, 255, 0.25)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '-18px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #ff00ea 40%, #bb00ff 60%, transparent)',
        borderRadius: 2,
        boxShadow: '0 0 8px #bb00ff77',
        zIndex: 1,
      },
    }}>
      <StyledTextField
        fullWidth
        label="Search for a country..."
        variant="outlined"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ flexGrow: 1 }}
      />

      <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
        <InputLabel
          sx={{
            color: '#bb79ff',
            fontFamily: 'Orbitron, monospace',
            '&.Mui-focused': { color: '#ff00ea' },
          }}
        >
          Filter by Region
        </InputLabel>
        <StyledSelect
          value={selectedRegion}
          label="Filter by Region"
          onChange={(e) => onRegionChange(e.target.value)}
        >
          <MenuItem value="">All Regions</MenuItem>
          {regions.map((region) => (
            <MenuItem key={region} value={region}>{region}</MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </Box>
  );
};

export default FilterBar;
