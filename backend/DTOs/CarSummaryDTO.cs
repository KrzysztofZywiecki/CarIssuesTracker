using Backend.DTOs;

public record CarSummaryDTO(Guid carId, IEnumerable<SummaryEntryDTO> summaryEntries);