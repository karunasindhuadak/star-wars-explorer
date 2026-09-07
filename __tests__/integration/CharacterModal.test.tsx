import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CharacterCard } from "@/components/CharacterCard";
import { CharacterModal } from "@/components/CharacterModal";
import { useState } from "react";
import type { Character } from "@/types";

const mockLuke: Character = {
  id: "1",
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  birthYear: "19BBY",
  gender: "male",
  homeworldUrl: "https://swapi.info/api/planets/1",
  speciesUrls: [],
  filmUrls: ["https://swapi.info/api/films/1"],
  created: "2014-12-09T13:50:51.644000Z",
  imageUrl: "https://picsum.photos/seed/1/200/300",
  speciesName: "Unknown",
  speciesColor: "hsl(215, 50%, 55%)",
  homeworldName: "Tatooine",
};

const mockLeia: Character = {
  id: "5",
  name: "Leia Organa",
  height: "150",
  mass: "49",
  birthYear: "19BBY",
  gender: "female",
  homeworldUrl: "https://swapi.info/api/planets/2",
  speciesUrls: [],
  filmUrls: ["https://swapi.info/api/films/1"],
  created: "2014-12-10T15:20:09.791000Z",
  imageUrl: "https://picsum.photos/seed/5/200/300",
  speciesName: "Unknown",
  speciesColor: "hsl(215, 50%, 55%)",
  homeworldName: "Alderaan",
};

function TestWrapper({ characters }: { characters: Character[] }) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {characters.map((char) => (
        <CharacterCard
          key={char.id}
          character={char}
          onClick={() => {
            setSelectedCharacter(char);
            setIsModalOpen(true);
          }}
        />
      ))}

      <CharacterModal
        character={selectedCharacter}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

describe("CharacterCard & Modal Integration", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes("/planets/1")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            name: "Tatooine",
            terrain: "desert",
            climate: "arid",
            population: "200000",
          }),
        });
      }
      if (url.includes("/planets/2")) {
         return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            name: "Alderaan",
            terrain: "grasslands, mountains",
            climate: "temperate",
            population: "2000000000",
          }),
        });
      }
      return Promise.reject(new Error("Not found"));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("opens modal with correct character details when a card is clicked", async () => {
    const user = userEvent.setup();
    render(<TestWrapper characters={[mockLuke]} />);

    const card = screen.getByRole("button", { name: /view details for luke skywalker/i });
    await user.click(card);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    
    const dialogScope = within(dialog);
    expect(dialogScope.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(dialogScope.getByText("1.72 m")).toBeInTheDocument();
    expect(dialogScope.getByText("77 kg")).toBeInTheDocument();
    expect(dialogScope.getByText("19BBY")).toBeInTheDocument();
  });

  it("fetches and displays homeworld data inside the modal", async () => {
    const user = userEvent.setup();
    render(<TestWrapper characters={[mockLuke]} />);

    await user.click(screen.getByRole("button", { name: /view details for luke skywalker/i }));

    const dialog = screen.getByRole("dialog");
    const dialogScope = within(dialog);

    expect(await dialogScope.findByText("Tatooine")).toBeInTheDocument();
    expect(dialogScope.getByText("desert")).toBeInTheDocument();
    expect(dialogScope.getByText("arid")).toBeInTheDocument();
    expect(dialogScope.getByText("200,000")).toBeInTheDocument();
  });

  it("closes the modal when the close (X) button is clicked", async () => {
    const user = userEvent.setup();
    render(<TestWrapper characters={[mockLuke]} />);

    await user.click(screen.getByRole("button", { name: /view details for luke skywalker/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: "Close" });
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes the modal when the Escape key is pressed", async () => {
    const user = userEvent.setup();
    render(<TestWrapper characters={[mockLuke]} />);

    await user.click(screen.getByRole("button", { name: /view details for luke skywalker/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("shows different data when a different character card is clicked", async () => {
    const user = userEvent.setup();
    render(<TestWrapper characters={[mockLuke, mockLeia]} />);

    const leiaCard = screen.getByRole("button", { name: /view details for leia organa/i });
    await user.click(leiaCard);

    const dialog = screen.getByRole("dialog");
    const dialogScope = within(dialog);

    expect(dialogScope.getByText("Leia Organa")).toBeInTheDocument();
    expect(dialogScope.queryByText("Luke Skywalker")).not.toBeInTheDocument();

    expect(await dialogScope.findByText("Alderaan")).toBeInTheDocument();
    expect(dialogScope.getByText("grasslands, mountains")).toBeInTheDocument();
  });
});
