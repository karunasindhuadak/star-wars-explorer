import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardPage from "@/app/dashboard/page";
import { useCharacters } from "@/hooks/useCharacters";
import type { Character } from "@/types";

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({ user: { username: "tester" }, logout: jest.fn() }),
}));

jest.mock("@/hooks/useCharacters", () => ({
  useCharacters: jest.fn(),
}));

const generateMockCharacters = (count: number): Character[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    name: `Test Character ${i + 1}`,
    height: "172",
    mass: "77",
    birthYear: "unknown",
    gender: "unknown",
    homeworldUrl: "https://swapi.info/api/planets/1",
    speciesUrls: [],
    filmUrls: [],
    created: "2014-12-09T13:50:51.644000Z",
    imageUrl: `https://picsum.photos/seed/${i + 1}/200/300`,
    speciesName: "Unknown",
    speciesColor: "hsl(215, 50%, 55%)",
    homeworldName: "Tatooine",
  }));
};

const mockCharacters = generateMockCharacters(15);

describe("Character Grid & Pagination", () => {
  const mockedUseCharacters = useCharacters as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows skeletons while loading", () => {
    mockedUseCharacters.mockReturnValue({
      characters: [],
      isLoading: true,
      error: null,
      species: [],
      films: [],
      planets: [],
      refetch: jest.fn(),
    });

    render(<DashboardPage />);

    expect(screen.getByRole("generic", { name: /loading characters/i })).toBeInTheDocument();
  });

  it("renders the first 10 characters after fetching", () => {
    mockedUseCharacters.mockReturnValue({
      characters: mockCharacters,
      isLoading: false,
      error: null,
      species: [],
      films: [],
      planets: [],
      refetch: jest.fn(),
    });

    render(<DashboardPage />);

    expect(screen.getByText("15 characters found")).toBeInTheDocument();

    const cards = screen.getAllByRole("button", { name: /view details for test character/i });
    expect(cards).toHaveLength(10);
    
    expect(screen.getByText("Test Character 1")).toBeInTheDocument();
    expect(screen.getByText("Test Character 10")).toBeInTheDocument();
    
    expect(screen.queryByText("Test Character 11")).not.toBeInTheDocument();
  });

  it("navigates to the next page when Next is clicked", async () => {
    const user = userEvent.setup();
    mockedUseCharacters.mockReturnValue({
      characters: mockCharacters,
      isLoading: false,
      error: null,
      species: [],
      films: [],
      planets: [],
      refetch: jest.fn(),
    });

    render(<DashboardPage />);

    const nextButton = screen.getByRole("button", { name: /go to next page/i });
    await user.click(nextButton);

    const cards = screen.getAllByRole("button", { name: /view details for test character/i });
    expect(cards).toHaveLength(5);

    expect(screen.getByText("Test Character 11")).toBeInTheDocument();
    expect(screen.getByText("Test Character 15")).toBeInTheDocument();
    
    expect(screen.queryByText("Test Character 1")).not.toBeInTheDocument();
  });

  it("shows an empty state when search yields no results", async () => {
    const user = userEvent.setup();
    mockedUseCharacters.mockReturnValue({
      characters: mockCharacters,
      isLoading: false,
      error: null,
      species: [],
      films: [],
      planets: [],
      refetch: jest.fn(),
    });

    render(<DashboardPage />);

    const searchInput = screen.getByRole("textbox", { name: /search characters by name/i });
    await user.type(searchInput, "xyzabcdef");

    await waitFor(() => {
      expect(screen.getByText("No characters found")).toBeInTheDocument();
      expect(screen.queryByText("Test Character 1")).not.toBeInTheDocument();
    });
  });
});
