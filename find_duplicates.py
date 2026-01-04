from collections import defaultdict

def find_duplicate_files(log_file):
    hashes = defaultdict(list)
    with open(log_file, 'r', encoding='utf-16') as f:
        for line in f:
            # Skip header lines and empty lines
            if line.strip() and not line.startswith('---') and not line.startswith('Algorithm'):
                print(f"Line: {line.strip()}")
                # Split the line into parts. This is brittle, but we are desperate.
                parts = line.split()
                print(f"Parts: {parts}")
                if len(parts) >= 2 and len(parts[1]) == 64:
                    print(f"Hash: {parts[1]}")
                    hashes[parts[1]].append(line.strip())

    duplicates_found = False
    for file_hash, lines in hashes.items():
        if len(lines) > 1:
            duplicates_found = True
            print(f"Duplicate files with hash: {file_hash}")
            for l in lines:
                print(f"- {l}")
            print("-" * 20)

    if not duplicates_found:
        print("No duplicate files found.")

if __name__ == '__main__':
    find_duplicate_files('C:\\Users\\kiki_\\.gemini\\tmp\\90da8df78d2950e3573c8687bb1f24d25e33f261b8a2f6390a814e9a715e04dd\\hashes_full.log')
